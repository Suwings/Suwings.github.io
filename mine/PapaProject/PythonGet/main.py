# -*- coding: utf-8 -*-

from sureplite import sureq

if __name__ == "__main__":
    sureq.reptile_select_context(
        'http://localhost/get.html',
        ".list",
        "ul>li>a",
        {
            "title": ".center>h4",
            "time": ".time",
            "context": ".context"
        },
        ["我自己的"]
    )
