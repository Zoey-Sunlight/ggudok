package com.alham.ggudok.config.security.auth.userInfo;

import com.alham.ggudok.config.security.auth.CustomOAuth2User;
import com.alham.ggudok.config.security.jwt.JwtService;
import com.alham.ggudok.entity.member.Role;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;


    @Value("${redirectUrl}")
    private String redirectUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("OAuth2 Login 성공!");
        try {
            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

            // User의 Role이 GUEST일 경우 처음 요청한 회원이므로 회원가입 페이지로 리다이렉트
            if(oAuth2User.getRole() == Role.TEMP) {
                String accessToken = jwtService.createAccessToken(oAuth2User.getLoginId());
                response.addHeader(jwtService.getAccessHeader(), accessToken);

                response.sendRedirect(redirectUrl+"/Auth/JoinAfter?access="+accessToken); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트


                //만약 쿠키 방식사용한다면 필요없음
                jwtService.sendAccessAndRefreshToken(response, accessToken, null);
//                User findUser = userRepository.findByEmail(oAuth2User.getEmail())
//                                .orElseThrow(() -> new IllegalArgumentException("이메일에 해당하는 유저가 없습니다."));
//                findUser.authorizeUser();
            } else {
                loginSuccess(response, oAuth2User); // 로그인에 성공한 경우 access, refresh 토큰 생성
            }
        } catch (Exception e) {
            throw e;
        }

    }

    // TODO : 소셜 로그인 시에도 무조건 토큰 생성하지 말고 JWT 인증 필터처럼 RefreshToken 유/무에 따라 다르게 처리해보기
    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
        String accessToken = jwtService.createAccessToken(oAuth2User.getLoginId());
        String refreshToken = jwtService.createRefreshToken();
        response.addHeader(jwtService.getAccessHeader(),  accessToken);
        response.addHeader(jwtService.getRefreshHeader(), refreshToken);
        Cookie access = new Cookie("access", accessToken);
        Cookie refresh = new Cookie("refresh", refreshToken);

        response.addCookie(access);
        response.addCookie(refresh);
        response.sendRedirect(redirectUrl+"?access="+accessToken+"&refresh="+refreshToken);


        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
        jwtService.updateRefreshToken(oAuth2User.getLoginId(), refreshToken);
    }
}
