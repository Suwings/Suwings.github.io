package example.interceptor;


import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

// Http 请求拦截器，可以用于过滤，若想只过滤部分路径的，可以在配置中处理
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        final String url = request.getRequestURL().toString();
        if (url.contains("/login")) {
            return true;
        }
        // 获取 session
        HttpSession session = request.getSession();
        Object obj = session.getAttribute("user");
        if (obj != null) {
            return true;
        }
        response.getWriter().write("| 403 Not Permission | ");
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}