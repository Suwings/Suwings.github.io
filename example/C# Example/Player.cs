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