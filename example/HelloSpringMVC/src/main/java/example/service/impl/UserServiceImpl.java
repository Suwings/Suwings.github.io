package example.service.impl;

import example.pojo.UserConfig;
import example.service.UserService;
import org.springframework.stereotype.Service;

// 实现服务器具体
@Service
public class UserServiceImpl implements UserService {
    @Override
    public boolean check(UserConfig userConfig) {
        if(userConfig.username.equals("Suwings") && userConfig.password.equals("123456")){
            return true;
        }
        return false;
    }
}
