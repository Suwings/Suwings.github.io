package example.controller;

import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;

public class BaseController {
    // 基于@ExceptionHandler异常处理
    @ExceptionHandler
    public String exception(HttpServletResponse response, Exception ex) throws IOException {
        response.getWriter().write("ERROR:" + ex.getMessage());
        return null;
    }
}
