package com.suwings.ssm;

import com.suwings.ssm.entity.Item;
import com.suwings.ssm.mapper.ItemMapper;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;

@SpringBootApplication
public class SpringMybatisApplication implements CommandLineRunner {

    private final ItemMapper itemMapper;

    public SpringMybatisApplication(final ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    public static void main(final String[] args) {
        SpringApplication.run(SpringMybatisApplication.class, args);
        System.out.println("------------- OK ------------- ");
    }

    @Override
    public void run(final String... args) throws Exception {
        final Item item = new Item();
        // 插入数据
//            item.setName("娃哈哈牛奶3");
//            item.setCategory("饮料");
//            item.setPrice(5);
//            item.setBrand("X");
//            item.setStock(10000);
//            item.setPicAddress("X");
//            itemMapper.save(item);
        // 查询所有数据并且显示
        final List<Item> items = this.itemMapper.findItemAll();
        for (final Item v : items) {
            System.out.println(v.getName());
        }
    }
}
