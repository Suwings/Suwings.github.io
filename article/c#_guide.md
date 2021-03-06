C# 代码示例
-------

语法备忘录

```C#

using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// 自定义的另外命名空间
using StoreA;

// 结构体
public struct Coords
{
    public Coords(double x, double y)
    {
        X = x;
        Y = y;
    }

    public double X { get; set; }
    public double Y { get; set; }

    public override string ToString() => $"({X}, {Y})";
}


// 枚举定义
enum ErrorCode : int
{
    None = 0,
    Unknown = 1,
    ConnectionLost = 100,
    OutlierReading = 200
}


namespace ExampleOne
{

    class Program
    {

        private static Object x = new Object(); // 线程锁变量

        static void Main(string[] args)
        {
            Console.WriteLine("------程序开始------");

            // 数组
            string[] names = { "Spencer", "Sally", "Doug" };
            int[] source = new int[] { 0, 1, 2, 3, 4, 5 };
            int[] source2 = new int[100];

            // 弃元，放弃型变量的使用与枚举类型的使用
            _ = ErrorCode.None;
            _ = "myname";

            // 元组，需要安装额外依赖库
            (string, string, int) tupe = ("a", "z", 100);
            (double Sum, int Count) t = (Sum: 4.5, Count: 3);
            double foo1 = t.Sum;
            var foo2 = t.Count; // var 类型推断

            // 结构体的使用
            Coords p = new Coords();
            p.X = 999;
            p.Y = 888;
            Console.WriteLine(p.ToString()); //Out: (999, 888)

            // 类与命名空间的用法
            Player player = new HumanPlayer("0001", "小王");
            Store storeA = new Store();
            player.Live(); //Out: 小王 正在生活...
            player.Thinking(); // 异步

            //虚函数与多态，此为重载函数，但因为父类是虚函数，所以可通过父类类型实例访问子类实例的方法
            player.GetInfo(); // Out: HumanPlayer 类的信息

            // 列表的用法
            List<string> list = new List<string>();
            list.Add("1");
            list.Add("2");
            foreach (String v in list)
            {
                Console.WriteLine($"列表:{v}");
            }

            // 字典的用法
            Dictionary<String, String> dict = new Dictionary<string, string>();
            dict.Add("名字", "小王");
            dict["年龄"] = "22"; // 索引器用法
            dict["身份编码"] = "40219328291023";
            foreach (KeyValuePair<string, string> entry in dict)
            {
                Console.WriteLine($"Key:{entry.Key} => {entry.Value}");
            }

            // Lambda 表达式
            Func<string, string> func = (string name) =>
             {
                 return $"__{name}__";
             };
            Console.WriteLine($"Lambda:{func("TestName")}"); //Out: Lambda:__TestName__

            // 泛型编程
            GenericList<string> genericList = new GenericList<string>();
            genericList.Add("文本...");

            // 异常处理
            try
            {
                int www = (int)new Object();
            }
            catch (Exception err)
            {
                Console.WriteLine("错误:" + err.Message);
            }

            // 线程锁
            lock (x)
            {
                // Your code...
            }
        }
    }

    // 泛型编程
    class GenericList<T>
    {
        private List<T> list = new List<T>();
        public void Add(T input)
        {
            list.Add(input);
        }
    }

}

```

类创建相关代码

```C#
using System;
using System.Threading;
using System.Threading.Tasks;

namespace ExampleOne
{
    abstract class Player : IPlayer
    {
        public string Name { get; set; } // 可读可写
        public string Uuid { get; set; } // 可读可写

        public Player()
        {

        }

        public Player(string uuid, string name)
        {
            this.Uuid = uuid;
            this.Name = name;
        }

        // 玩家生活方法
        abstract public void Live();

        public async void Thinking()
        {
            Console.WriteLine("正在思考...");
            // 遇到第一个 await 时开始异步
            await Task.Run(() =>
            {
                Console.WriteLine($"{this.Name} 正在异步的思考...");
            });
            Console.WriteLine("思考结束...");
        }

        public virtual string GetInfo() // 虚函数
        {
            Console.WriteLine("Player 类的信息");
            return "...info1...";
        }

    }

    class HumanPlayer : Player
    {
        public HumanPlayer(string uuid, string name)
        {
            //base(uuid, name); // 上下文无效
            this.Name = name; // 属性必须有 set 方法，否则只读
            this.Uuid = uuid;
        }
        public override void Live()
        {
            Console.WriteLine(this.Name + " 正在生活...");
        }

        public override string GetInfo()
        {
            Console.WriteLine("HumanPlayer 类的信息");
            return "...info2...";
        }


    }
}
```




接口创建
```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ExampleOne
{
    interface IPlayer
    {

    }
}

```

不同的命名空间
```C#
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StoreA
{
    public class Store
    {
        public Store()
        {
            Console.WriteLine("储存库已初始化成功");
        }
    }
}

```

