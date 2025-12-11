;; Counter Smart Contract
;; A simple yet unique counter application for Stacks blockchain
;; Features: Increment, Decrement, and Balance display functionality

;; Define the contract owner (replace with your principal address)
(define-constant contract-owner tx-sender)

;; Data variable to store the current counter balance
(define-data-var balance uint u0)

;; Error codes for better error handling
(define-constant ERR-UNAUTHORIZED (err u1001))
(define-constant ERR-UNDERFLOW (err u1002))

;; Public read-only function to get the current balance
;; Anyone can call this function to view the counter balance
(define-read-only (get-balance)
    (var-get balance)
)

;; Public function to increment the counter by 1
;; Anyone can call this function to increase the counter
(define-public (increment)
    (begin
        ;; Get the current balance
        (let ((current-balance (var-get balance)))
            ;; Increment the balance by 1
            (var-set balance (+ current-balance u1))
            ;; Return success with the new balance
            (ok (var-get balance))
        )
    )
)

;; Public function to decrement the counter by 1
;; Prevents underflow (balance cannot go below 0)
;; Anyone can call this function to decrease the counter
(define-public (decrement)
    (begin
        ;; Get the current balance
        (let ((current-balance (var-get balance)))
            ;; Check if balance is greater than 0 to prevent underflow
            (asserts! (> current-balance u0) ERR-UNDERFLOW)
            ;; Decrement the balance by 1
            (var-set balance (- current-balance u1))
            ;; Return success with the new balance
            (ok (var-get balance))
        )
    )
)

;; Public function to reset the counter to 0
;; Anyone can call this function to reset the counter
(define-public (reset)
    (begin
        ;; Set balance to 0
        (var-set balance u0)
        ;; Return success
        (ok u0)
    )
)

;; Optional: Increment by a specific amount
;; Allows incrementing by a custom value (useful for advanced use cases)
(define-public (increment-by (amount uint))
    (begin
        ;; Get the current balance
        (let ((current-balance (var-get balance)))
            ;; Increment by the specified amount
            (var-set balance (+ current-balance amount))
            ;; Return success with the new balance
            (ok (var-get balance))
        )
    )
)

;; Optional: Decrement by a specific amount
;; Allows decrementing by a custom value with underflow protection
(define-public (decrement-by (amount uint))
    (begin
        ;; Get the current balance
        (let ((current-balance (var-get balance)))
            ;; Check if balance is sufficient to prevent underflow
            (asserts! (>= current-balance amount) ERR-UNDERFLOW)
            ;; Decrement by the specified amount
            (var-set balance (- current-balance amount))
            ;; Return success with the new balance
            (ok (var-get balance))
        )
    )
)

