package example.controller;

import example.pojo.UserConfig;
import example.service.UserService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@Controller
public class IndexController extends BaseController {

    private static final Log logger = LogFactory.getLog(IndexController.class);

    // 依赖注入服务
    @Autowired
    public UserService userService;

    @RequestMapping("/index")
    public String index(HttpSession session, HttpServletRequest request, HttpServletResponse response, Model model) {
        model.addAttribute("test", "Deployed successfully");
        return "index";
    }

    @RequestMapping("/api")
    public String api(HttpSession session, HttpServletResponse response, int id) throws IOException {
        response.getWriter().write("api ok,ID:" + id);
        return null;
    }

    @RequestMapping("/error_test")
    public String errorTest(HttpSession session, HttpServletRequest request, HttpServletResponse response, Model model) throws IOException {
        final int a = 1 / 0;
        response.getWriter().write("ok");
        return null;
    }


    @RequestMapping("/register")
    public String register(UserConfig userConfig, HttpServletResponse response) throws IOException {
        //进入 http://localhost:9527/HelloSpringMVC01_war/register?username=Suwings&password=123456
        response.getWriter().write("[Register] USER CONFIG:" + userConfig.username + " | " + userConfig.password);
        //输出 [Register] USER CONFIG:Suwings | 123456
        return null;
    }

    @RequestMapping("/login")
    public String login(UserConfig userConfig, HttpServletResponse response, HttpSession session) throws IOException {
        // 使用服务层
        if (userService.check(userConfig)) {
            //必须从这里登陆之后才可以访问其他路径，否则将被拦截
            session.setAttribute("user", userConfig.getUsername());
            response.getWriter().write("True:" + userConfig.getUsername());
        } else {
            response.getWriter().write("False");
        }
        return null;
    }
}