package com.suwings.ssm.mapper;

import com.suwings.ssm.entity.Item;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;


@Mapper
public interface ItemMapper {

    List<Item> findItemAll();

    void save(Item item);

    void update(Item item);

    @Delete("delete from item WHERE id = #{id}")
    void deleteById(int id);

    @Select("SELECT * FROM item WHERE id = #{id}")
    Item findItemById(long id);


}
