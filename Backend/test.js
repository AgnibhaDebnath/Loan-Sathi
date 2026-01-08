import http from "k6/http";
import { sleep } from "k6";

export let options = {
    scenarios: {
        borrower_exist:
        {
            executor: "ramping-vus",
            startVUs: 0,
            stages: [ { duration: "30s", target: 50 }, 
             { duration: "1m", target: 50 }, 
            { duration: "30s", target: 0 },
            ],
            exec: "checkBorrower",
        },
   
    token_verification:
        {
                 executor: "ramping-vus",
            startVUs: 0,
            stages: [ { duration: "30s", target: 50 }, 
             { duration: "1m", target: 50 }, 
            { duration: "30s", target: 0 },
            ],
        exec: "sendToken",
        },
    loan_status:
        {
                executor: "ramping-vus",
            startVUs: 0,
            stages: [ { duration: "30s", target: 50 }, 
             { duration: "1m", target: 50 }, 
            { duration: "30s", target: 0 },
            ],
        exec: "viewLoanStatus",
        },
        emi_schedule: {
                executor: "ramping-vus",
            startVUs: 0,
            stages: [ { duration: "30s", target: 50 }, 
             { duration: "1m", target: 50 }, 
            { duration: "30s", target: 0 },
            ],
            exec: "viewLoanDetails",
        },
     },
}
export function checkBorrower () {

    const url = "http://localhost:3000/check-borrower-exist";
    const payload = JSON.stringify({ mobileNo: "8695276026", });
    const params = { headers: { "Content-Type": "application/json", }, };
    http.post(url, payload, params);
    sleep(1); 
}
export function sendToken() {
    const url="http://localhost:3000/api/borrower-login"
    const params = { headers: { "Content-Type": "application/json", Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzOGVhNmEwNDA4YjBjYzVkYTE4OWRmYzg4ODgyZDBmMWI3ZmJmMGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXVkIjoibG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXV0aF90aW1lIjoxNzY3NTMwMDU3LCJ1c2VyX2lkIjoidlNySHdlOENxTE5tWlZaYlJWSEJDTDFWaTBKMyIsInN1YiI6InZTckh3ZThDcUxObVpWWmJSVkhCQ0wxVmkwSjMiLCJpYXQiOjE3Njc1MzAwNTcsImV4cCI6MTc2NzUzMzY1NywicGhvbmVfbnVtYmVyIjoiKzkxODY5NTI3NjAyNiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODY5NTI3NjAyNiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.TaQw0zz1gmFQ0sO7cp3vHBw7YR2x1Dk9uiba_1GFcEQocdziL70V5iJDR8jnk7aJ_B9mvW1dLt5_paZvLVqlQvRGO2C42HGIi1kFF9Q3jbbVU4BBVa2VGhoJAM6ZdJqTb9pg52LuZNEbR1kqXdVMfbYDirFh80nerr1iGKXgn2BFUcQ4nDVEG1Kn6zlDo0VAMUjXPXz4c4StDSBIvUwH2Wd4KQ7QbN9Rb7aJEs_xxEcY0fuuN0LPy-AGhsPbtmCQbUGYmBZ0fmalRl-Dvkrt3QwH2tfbAfa9H7kkLL3lTl11Ip7J0DcVqw1vrq0BCBPqIXzgH_V0MDM4i7CSQBdaXA", }, };
    http.post(url, null, params);
    sleep(1)
}
export function viewLoanStatus() {
    const url = "http://localhost:3000/loan-status";
    const params = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzOGVhNmEwNDA4YjBjYzVkYTE4OWRmYzg4ODgyZDBmMWI3ZmJmMGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXVkIjoibG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXV0aF90aW1lIjoxNzY3NTMwMDU3LCJ1c2VyX2lkIjoidlNySHdlOENxTE5tWlZaYlJWSEJDTDFWaTBKMyIsInN1YiI6InZTckh3ZThDcUxObVpWWmJSVkhCQ0wxVmkwSjMiLCJpYXQiOjE3Njc1MzAwNTcsImV4cCI6MTc2NzUzMzY1NywicGhvbmVfbnVtYmVyIjoiKzkxODY5NTI3NjAyNiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODY5NTI3NjAyNiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.TaQw0zz1gmFQ0sO7cp3vHBw7YR2x1Dk9uiba_1GFcEQocdziL70V5iJDR8jnk7aJ_B9mvW1dLt5_paZvLVqlQvRGO2C42HGIi1kFF9Q3jbbVU4BBVa2VGhoJAM6ZdJqTb9pg52LuZNEbR1kqXdVMfbYDirFh80nerr1iGKXgn2BFUcQ4nDVEG1Kn6zlDo0VAMUjXPXz4c4StDSBIvUwH2Wd4KQ7QbN9Rb7aJEs_xxEcY0fuuN0LPy-AGhsPbtmCQbUGYmBZ0fmalRl-Dvkrt3QwH2tfbAfa9H7kkLL3lTl11Ip7J0DcVqw1vrq0BCBPqIXzgH_V0MDM4i7CSQBdaXA", }, };
    http.get(url, params); sleep(1);
}
export function viewLoanDetails() {
    const url = "http://localhost:3000/get-loan-details";
    const params = { headers: { Authorization: "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzOGVhNmEwNDA4YjBjYzVkYTE4OWRmYzg4ODgyZDBmMWI3ZmJmMGUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXVkIjoibG9hbi1tYW5hZ2VtZW50LXBsYXRmb3JtLTc1MGM1IiwiYXV0aF90aW1lIjoxNzY3NTMwMDU3LCJ1c2VyX2lkIjoidlNySHdlOENxTE5tWlZaYlJWSEJDTDFWaTBKMyIsInN1YiI6InZTckh3ZThDcUxObVpWWmJSVkhCQ0wxVmkwSjMiLCJpYXQiOjE3Njc1MzAwNTcsImV4cCI6MTc2NzUzMzY1NywicGhvbmVfbnVtYmVyIjoiKzkxODY5NTI3NjAyNiIsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsicGhvbmUiOlsiKzkxODY5NTI3NjAyNiJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.TaQw0zz1gmFQ0sO7cp3vHBw7YR2x1Dk9uiba_1GFcEQocdziL70V5iJDR8jnk7aJ_B9mvW1dLt5_paZvLVqlQvRGO2C42HGIi1kFF9Q3jbbVU4BBVa2VGhoJAM6ZdJqTb9pg52LuZNEbR1kqXdVMfbYDirFh80nerr1iGKXgn2BFUcQ4nDVEG1Kn6zlDo0VAMUjXPXz4c4StDSBIvUwH2Wd4KQ7QbN9Rb7aJEs_xxEcY0fuuN0LPy-AGhsPbtmCQbUGYmBZ0fmalRl-Dvkrt3QwH2tfbAfa9H7kkLL3lTl11Ip7J0DcVqw1vrq0BCBPqIXzgH_V0MDM4i7CSQBdaXA", }, };
    http.get(url, params);
    sleep(1);
}