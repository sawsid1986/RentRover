#!/usr/bin/env bash
#
# create-sql-db.sh
#
# Create an AWS RDS SQL Server database (or other RDS engine) using awscli.
# - Creates a security group (if not supplied) that opens port 1433 (SQL Server).
# - Creates a DB subnet group (if not supplied) using subnets from the default VPC.
# - Creates the RDS DB instance and waits until it's available, then prints the endpoint.
#
# Usage:
#   ./create-sql-db.sh \
#     --db-identifier mydb \
#     --db-name MyDatabase \
#     --master-username admin \
#     --master-password 'P@ssw0rd!' \
#     [--engine sqlserver-ex] \
#     [--instance-class db.t3.medium] \
#     [--allocated-storage 20] \
#     [--region us-east-1] \
#     [--vpc-security-group-ids sg-0123abcd] \
#     [--db-subnet-group-name my-subnet-group] \
#     [--publicly-accessible true] \
#     [--allowed-cidr 10.0.0.0/24]
#
# Notes:
# - Default engine is sqlserver-ex (SQL Server Express). Change with --engine.
# - This script requires aws CLI configured with sufficient permissions.
# - Opening 1433 to 0.0.0.0/0 is insecure; prefer restricting --allowed-cidr.

set -euo pipefail

# Defaults
ENGINE="sqlserver-ex"
INSTANCE_CLASS="db.t3.medium"
ALLOCATED_STORAGE="20"
REGION=""
VPC_SG_IDS=""
DB_SUBNET_GROUP=""
PUBLICLY_ACCESSIBLE="false"
ALLOWED_CIDR="0.0.0.0/0"

print_usage() {
    sed -n '1,120p' "$0" | sed -n '1,120p'
}

# Simple arg parsing
while [[ $# -gt 0 ]]; do
    case "$1" in
        --db-identifier) DB_IDENTIFIER="$2"; shift 2;;
        --db-name) DB_NAME="$2"; shift 2;;
        --master-username) MASTER_USERNAME="$2"; shift 2;;
        --master-password) MASTER_PASSWORD="$2"; shift 2;;
        --engine) ENGINE="$2"; shift 2;;
        --instance-class) INSTANCE_CLASS="$2"; shift 2;;
        --allocated-storage) ALLOCATED_STORAGE="$2"; shift 2;;
        --region) REGION="$2"; shift 2;;
        --vpc-security-group-ids) VPC_SG_IDS="$2"; shift 2;;
        --db-subnet-group-name) DB_SUBNET_GROUP="$2"; shift 2;;
        --publicly-accessible) PUBLICLY_ACCESSIBLE="$2"; shift 2;;
        --allowed-cidr) ALLOWED_CIDR="$2"; shift 2;;
        -h|--help) print_usage; exit 0;;
        *) echo "Unknown option: $1"; print_usage; exit 1;;
    esac
done

# Basic validation
: "${DB_IDENTIFIER:?--db-identifier is required}"
: "${DB_NAME:?--db-name is required}"
: "${MASTER_USERNAME:?--master-username is required}"

if [[ -z "${MASTER_PASSWORD:-}" ]]; then
    # generate a reasonably strong password if not provided
    if command -v openssl >/dev/null 2>&1; then
        MASTER_PASSWORD="$(openssl rand -base64 18)"
    else
        MASTER_PASSWORD="$(date +%s | sha256sum | base64 | head -c 20)"
    fi
    echo "Generated MASTER_PASSWORD: ${MASTER_PASSWORD}"
fi

if ! command -v aws >/dev/null 2>&1; then
    echo "aws CLI not found. Install and configure aws CLI first."
    exit 1
fi

if [[ -n "$REGION" ]]; then
    export AWS_REGION="$REGION"
    AWS_CLI_REGION_ARG="--region $REGION"
else
    AWS_CLI_REGION_ARG=""
fi

echo "Starting RDS creation for ${DB_IDENTIFIER} (engine: ${ENGINE}) in region: ${REGION:-<default>}"

# If security group IDs not provided, create one in the default VPC
if [[ -z "$VPC_SG_IDS" ]]; then
    echo "No security group provided. Creating one in the default VPC..."
    DEFAULT_VPC_ID="$(aws ec2 describe-vpcs --filters Name=isDefault,Values=true --query 'Vpcs[0].VpcId' --output text ${AWS_CLI_REGION_ARG})"
    if [[ "$DEFAULT_VPC_ID" == "None" || -z "$DEFAULT_VPC_ID" ]]; then
        echo "No default VPC found. Attempting to use the first VPC."
        DEFAULT_VPC_ID="$(aws ec2 describe-vpcs --query 'Vpcs[0].VpcId' --output text ${AWS_CLI_REGION_ARG})"
    fi
    if [[ -z "$DEFAULT_VPC_ID" || "$DEFAULT_VPC_ID" == "None" ]]; then
        echo "Unable to determine a VPC to create a security group in. Provide --vpc-security-group-ids or ensure a VPC exists."
        exit 1
    fi

    SG_NAME="rds-sg-${DB_IDENTIFIER}"
    SG_DESC="RDS access SG for ${DB_IDENTIFIER}"
    CREATED_SG_ID="$(aws ec2 create-security-group --group-name "${SG_NAME}" --description "${SG_DESC}" --vpc-id "${DEFAULT_VPC_ID}" --query 'GroupId' --output text ${AWS_CLI_REGION_ARG})"
    echo "Created SG: ${CREATED_SG_ID}"

    echo "Authorizing inbound TCP/1433 from ${ALLOWED_CIDR} (change in script if not desired)..."
    aws ec2 authorize-security-group-ingress --group-id "${CREATED_SG_ID}" --protocol tcp --port 1433 --cidr "${ALLOWED_CIDR}" ${AWS_CLI_REGION_ARG}
    VPC_SG_IDS="${CREATED_SG_ID}"
fi

echo "Using security group(s): ${VPC_SG_IDS}"

# If DB subnet group not provided, create one using subnets in the same VPC as the first security group
if [[ -z "$DB_SUBNET_GROUP" ]]; then
    echo "No DB subnet group provided. Creating one from subnets in the SG's VPC..."
    FIRST_SG_ID="$(echo "$VPC_SG_IDS" | awk '{print $1}')"
    SG_VPC_ID="$(aws ec2 describe-security-groups --group-ids "${FIRST_SG_ID}" --query 'SecurityGroups[0].VpcId' --output text ${AWS_CLI_REGION_ARG})"
    SUBNETS="$(aws ec2 describe-subnets --filters Name=vpc-id,Values="${SG_VPC_ID}" --query 'Subnets[].SubnetId' --output text ${AWS_CLI_REGION_ARG})"

    if [[ -z "$SUBNETS" ]]; then
        echo "No subnets found in VPC ${SG_VPC_ID}. Provide --db-subnet-group-name or ensure subnets exist."
        exit 1
    fi

    DB_SUBNET_GROUP="rds-subnet-${DB_IDENTIFIER}"
    echo "Creating DB subnet group ${DB_SUBNET_GROUP} with subnets: ${SUBNETS}"
    aws rds create-db-subnet-group --db-subnet-group-name "${DB_SUBNET_GROUP}" \
        --db-subnet-group-description "Subnet group for ${DB_IDENTIFIER}" \
        --subnet-ids ${SUBNETS} ${AWS_CLI_REGION_ARG}
fi

echo "Using DB subnet group: ${DB_SUBNET_GROUP}"

# Create the DB instance
echo "Creating DB instance ${DB_IDENTIFIER}..."
aws rds create-db-instance \
    --db-instance-identifier "${DB_IDENTIFIER}" \
    --allocated-storage "${ALLOCATED_STORAGE}" \
    --db-instance-class "${INSTANCE_CLASS}" \
    --engine "${ENGINE}" \
    --master-username "${MASTER_USERNAME}" \
    --master-user-password "${MASTER_PASSWORD}" \
    --db-name "${DB_NAME}" \
    --vpc-security-group-ids ${VPC_SG_IDS} \
    --db-subnet-group-name "${DB_SUBNET_GROUP}" \
    --publicly-accessible "${PUBLICLY_ACCESSIBLE}" \
    --no-multi-az \
    ${AWS_CLI_REGION_ARG}

echo "Waiting for DB instance to become available (this may take several minutes)..."
aws rds wait db-instance-available --db-instance-identifier "${DB_IDENTIFIER}" ${AWS_CLI_REGION_ARG}

echo "DB instance is available. Fetching endpoint..."
ENDPOINT=$(aws rds describe-db-instances --db-instance-identifier "${DB_IDENTIFIER}" --query 'DBInstances[0].Endpoint.Address' --output text ${AWS_CLI_REGION_ARG})
PORT=$(aws rds describe-db-instances --db-instance-identifier "${DB_IDENTIFIER}" --query 'DBInstances[0].Endpoint.Port' --output text ${AWS_CLI_REGION_ARG})

cat <<EOF

RDS instance created:
    Identifier: ${DB_IDENTIFIER}
    Engine:     ${ENGINE}
    DB name:    ${DB_NAME}
    Endpoint:   ${ENDPOINT}:${PORT}
    Username:   ${MASTER_USERNAME}
    Password:   ${MASTER_PASSWORD}   <-- store this securely!

Security groups: ${VPC_SG_IDS}
DB subnet group: ${DB_SUBNET_GROUP}

EOF