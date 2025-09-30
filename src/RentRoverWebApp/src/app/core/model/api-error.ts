export class ApiError {
    constructor(
        public apiErrorStatus: ApiErrorStatus
    ) { }
}

export class ApiErrorStatus {
    constructor(
        public severeity: string,
        public message: string
    ) { }
}