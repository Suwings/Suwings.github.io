package com.suwings.ssm.controller;


import com.suwings.ssm.entity.Item;
import com.suwings.ssm.mapper.ItemMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;

@Controller
public class TopController {

    private final ItemMapper itemMapper;

    public TopController(final ItemMapper itemMapper) {
        this.itemMapper = itemMapper;
    }

    @RequestMapping("/")
    public String list(final Model model) {
        final List<Item> list = this.itemMapper.findItemAll();
        model.addAttribute("prods", list);
        return "list";
    }

    @RequestMapping("/info")
    public String info(final int id, final Model model) {
        final Item item = this.itemMapper.findItemById(id);
        model.addAttribute("item", item);
        return "info";
    }

    @RequestMapping("/create")
    public String insertPage() {
        return "insert";
    }

    @RequestMapping(value = "/create_item", method = RequestMethod.POST)
    public @ResponseBody
    String create(@RequestParam("file") final MultipartFile file,
                  final String name, final String category, final int price, final String brand, final int stock) throws IOException {

        final String fileName = file.getOriginalFilename();
        final int size = (int) file.getSize();
        System.out.println(fileName + "-->" + size);

        final String path = "D:/upload_tmp";
        final File dest = new File(path + "/" + fileName);
        if (!dest.getParentFile().exists()) { //判断文件父目录是否存在
            dest.getParentFile().mkdir();
        }
        file.transferTo(dest); //保存文件
        final Item item = new Item();
        item.setName(name);
        item.setBrand(brand);
        item.setPrice(price);
        item.setCategory(category);
        item.setStock(stock);
        item.setPicAddress(fileName);
        this.itemMapper.save(item);
        return "新增成功√ <a href=\"/\">点击返回</a>";
    }

    @RequestMapping(value = "/update_item", method = RequestMethod.POST)
    public @ResponseBody
    String update(final Item item) {
        this.itemMapper.update(item);
        return "操作成功√ <a href=\"/\">点击返回</a>";
    }

    @RequestMapping("/delete_item")
    public @ResponseBody
    String delete(final int id) {
        this.itemMapper.deleteById(id);
        return "删除成功√ <a href=\"/\">点击返回</a>";
    }


    @RequestMapping("/download")
    public String downLoad(final String filename, final HttpServletResponse response) throws UnsupportedEncodingException {
        final String filePath = "D:/upload_tmp/";
        final File file = new File(filePath + "/" + filename);
        if (file.exists()) { //判断文件父目录是否存在
            response.setContentType("application/vnd.ms-excel;charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            // response.setContentType("application/force-download");
            response.setHeader("Content-Disposition", "attachment;fileName=" + java.net.URLEncoder.encode(filename, "UTF-8"));
            final byte[] buffer = new byte[1024];
            FileInputStream fis = null; //文件输入流
            BufferedInputStream bis = null;
            OutputStream os = null; //输出流
            try {
                os = response.getOutputStream();
                fis = new FileInputStream(file);
                bis = new BufferedInputStream(fis);
                int i = bis.read(buffer);
                while (i != -1) {
                    os.write(buffer);
                    i = bis.read(buffer);
                }

            } catch (final Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
            System.out.println("----------file download---" + filename);
            try {
                bis.close();
                fis.close();
            } catch (final IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return null;
    }

}
