# Create the Kubernetes Cluster
    eksctl create cluster -f Infrastructure/eksctl/01-initial-cluster/cluster.yaml

# Getting NodeGroup IAM Role from Kubernetes Cluster
    nodegroup_iam_role=$(aws cloudformation list-exports --query "Exports[?contains(Name, 'nodegroup-eks-node-group::InstanceRoleARN')].Value" --output text | xargs | cut -d "/" -f 2)

# Installing Load Balancer Controller
    ( cd ./Infrastructure/k8s-tooling/load-balancer-controller && ./create.sh )
    aws_lb_controller_policy=$(aws cloudformation describe-stacks --stack-name aws-load-balancer-iam-policy --query "Stacks[*].Outputs[?OutputKey=='IamPolicyArn'].OutputValue" --output text | xargs)
    aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn ${aws_lb_controller_policy}

# Create SSL Certfiicate in ACM
    ( cd ./Infrastructure/cloudformation/ssl-certificate && ./create.sh )

# Installing ExternalDNS
    ./Infrastructure/k8s-tooling/external-dns/create.sh
    aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn arn:aws:iam::aws:policy/AmazonRoute53FullAccess

#  Create the SQL DB Tables
    ( cd ./src/RentRoverWebApi/infra/cloudformation && ./create-sql-db.sh \
        --db-identifier RentRoverDBInstance --db-name RentRoverDatabase \
        --db-username RentRoverAdmin --db-password 'YourStrong!Passw0rd')  

# Adding sql database Permissions to the node
    aws iam attach-role-policy --role-name ${nodegroup_iam_role} --policy-arn arn:aws:iam::aws:policy/SQLServerAccessPolicy

# Installing the applications
    ( cd ./src/RentRoverWebApi/infra/helm && ./create.sh ) & \
    ( cd ./src/RentRoverAuthService/infra/helm && ./create.sh ) & \
    ( cd ./src/RentRoverWebApp/infra/helm && ./create.sh ) &

    wait

# Here's your application

echo "************************** HERE IS YOUR APP!!! **************************"
kubectl get ingress -n development front-end-development-ingress | grep bookstore | awk '{print $3}'
echo "**************************"