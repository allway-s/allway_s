package com.korit.allways_back.controller;


import com.korit.allways_back.dto.response.KakaoApproveResponse;
import com.korit.allways_back.service.PaymentService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService kakaoPayService;

    @GetMapping("/success")
    public ResponseEntity<?> afterPayRequest(@RequestParam("pg_token") String pgToken, HttpSession session) {
        // 저장했던 TID 꺼내기
        String tid = (String) session.getAttribute("tid");

        if (tid == null) {
            return ResponseEntity.badRequest().body("세션에 TID가 없습니다. 결제 시간이 만료되었을 수 있습니다.");
        }

        try {
            // 카카오 승인 API 호출
            KakaoApproveResponse approveResponse = kakaoPayService.payApprove(tid, pgToken);

        // ------------------------------------
            // DB로직
        // ------------------------------------

            // 결제 완료 후 세션 정리
            session.removeAttribute("tid");

            return ResponseEntity.ok(approveResponse);

        } catch (Exception e) {
            // 승인 실패 처리 (금액 부족, 인증 만료 등)
            return ResponseEntity.internalServerError().body("결제 승인 중 오류 발생: " + e.getMessage());
        }
    }

}
