package com.korit.allways_back.controller;

import com.korit.allways_back.dto.request.PaymentVerifyDto;
import com.korit.allways_back.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerifyDto verifyDto) {
        try {
            boolean isVerified = paymentService.verifyAndCompleteOrder(verifyDto);

            if (isVerified) {
                return ResponseEntity.ok("결제 검증 및 완료");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("결제 금액 불일치.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("결제 검증 중 오류 발생: " + e.getMessage());
        }
    }
}
