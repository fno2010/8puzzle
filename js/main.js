var Target = [1, 2, 3, 8, 0, 4, 7, 6, 5];
var Status = Target.concat();

var evalf1 = [
                0, 1, 1, 1, 1, 1, 1, 1, 1,
                1, 0, 1, 1, 1, 1, 1, 1, 1,
                1, 1, 0, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 0, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 0, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 0, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 0, 1, 1,
                1, 1, 1, 1, 1, 1, 1, 0, 1,
                1, 1, 1, 1, 1, 1, 1, 1, 0
            ];

var evalf2 = [
                0, 1, 2, 1, 2, 3, 2, 3, 4,
                1, 0, 1, 2, 1, 2, 3, 2, 3,
                2, 1, 0, 3, 2, 1, 4, 3, 2,
                1, 2, 3, 0, 1, 2, 1, 2, 3,
                2, 1, 2, 1, 0, 1, 2, 1, 2,
                3, 2, 1, 2, 1, 0, 3, 2, 1,
                2, 3, 4, 1, 2, 3, 0, 1, 2,
                3, 2, 3, 2, 1, 2, 1, 0, 1,
                4, 3, 2, 3, 2, 1, 2, 1, 0
            ];

// The Default Value of __evalf is evalf2, You can modify it latter
var __evalf = evalf2;

var Cube = $(".cube");

window.onload = function() {
    $("div.col-md-8").height($("div.col-md-4").height());
    Show();
}

function Show() {
    for(var i=0; i<9; i++)
    {
        Cube.eq(i).css("background-color", "white").html("");
        Status[i] && Cube.eq(i).css("background-color", "purple").html(Status[i]);
    }
}

function MoveUp() {
    var i = Status.indexOf(0);
    if(i < 6)
    {
        Status[i] = Status[i+3];
        Status[i+3] = 0;
        // Cube.eq(i+3).animate({up:'52px'});
    }
    Show();
    // setTimeout("MoveUp()", 500);
}

function MoveDown() {
    var i = Status.indexOf(0);
    if(i > 2)
    {
        Status[i] = Status[i-3];
        Status[i-3] = 0;
    }
    Show();
    // setTimeout("MoveDown()", 500);
}

function MoveLeft() {
    var i = Status.indexOf(0);
    if(i%3 < 2)
    {
        Status[i] = Status[i+1];
        Status[i+1] = 0;
    }
    Show();
    // setTimeout("MoveLeft()", 500);
}

function MoveRight() {
    var i = Status.indexOf(0);
    if(i%3 > 0)
    {
        Status[i] = Status[i-1];
        Status[i-1] = 0;
    }
    Show();
    // setTimeout("MoveRight()", 500);
}

function Move(i) {
    if(typeof(i)==="number")
    {
        if(i > 2 && !Status[i-3])
        {
            Status[i-3] = Status[i];
            Status[i] = 0;
        }
        if(i < 6 && !Status[i+3])
        {
            Status[i+3] = Status[i];
            Status[i] = 0;
        }
        if(i%3 > 0 && !Status[i-1])
        {
            Status[i-1] = Status[i];
            Status[i] = 0;
        }
        if(i%3 < 2 && !Status[i+1])
        {
            Status[i+1] = Status[i];
            Status[i] = 0;
        }
        Show();
    }
    else if(typeof(i)==="object")
    {
        t_start = 0;
        for(x in i)
        {
            switch(i[x])
            {
                case 0: setTimeout("MoveUp()", t_start += 500); break;
                case 1: setTimeout("MoveDown()", t_start += 500); break;
                case 2: setTimeout("MoveLeft()", t_start += 500); break;
                case 3: setTimeout("MoveRight()", t_start += 500); break;
            }
        }
    }
}

function Result(__steps, __nodes, __path) {
    $("#result-steps").html(__steps);
    $("#result-nodes").html(__nodes);
    Move(__path);
}

function Equal(__src, __dst) {
    return __src.toString() == __dst.toString();
}

function Judge(__src) {
    var src = __src.concat();
    src.splice(__src.indexOf(0),1);
    var judge = 0;
    for (var i=1; i<8; i++)
        for (var j=0; j<i; j++)
            judge ^= (src[i] < src[j]);
    return judge;
}

function Include(__src, __nodeset) {
    for (var i in __nodeset)
        if (Equal(__src.Status, __nodeset[i].Status))
            return i;

    return -1;
}

function Random() {
    var temp = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (var i=0; i<9; i++)
    {
        Status[i] = temp.splice(Math.floor((8.9999-i)*Math.random()), 1)[0];
    }
    Show();
}

// The Structure of Status Node
function Node(__status, __dpath) {
    this.Status = __status.concat();
    this.Dpath = __dpath.concat();
}

Node.prototype.Next = function() {
    var i = this.Status.indexOf(0);
    var nextStatus = [];
    var nextNode = [];
    // if Up is enable
    if(i < 6)
    {
        nextStatus = this.Status.concat();
        nextStatus[i] = nextStatus[i+3];
        nextStatus[i+3] = 0;
        nextNode.push(new this.constructor(nextStatus, this.Dpath.concat(0)));
    }
    // if Down is enable
    if(i > 2)
    {
        nextStatus = this.Status.concat();
        nextStatus[i] = nextStatus[i-3];
        nextStatus[i-3] = 0;
        nextNode.push(new this.constructor(nextStatus, this.Dpath.concat(1)));
    }
    // if Left is enable
    if(i%3 < 2)
    {
        nextStatus = this.Status.concat();
        nextStatus[i] = nextStatus[i+1];
        nextStatus[i+1] = 0;
        nextNode.push(new this.constructor(nextStatus, this.Dpath.concat(2)));
    }
    // if Right is enable
    if(i%3 > 0)
    {
        nextStatus = this.Status.concat();
        nextStatus[i] = nextStatus[i-1];
        nextStatus[i-1] = 0;
        nextNode.push(new this.constructor(nextStatus, this.Dpath.concat(3)));
    }

    return nextNode;
};

Node.prototype.Prev = function() {
    var i = this.Status.indexOf(0);
    var prevStatus = [];
    var prevNode = [];
    // if Up is enable
    if(i < 6)
    {
        prevStatus = this.Status.concat();
        prevStatus[i] = prevStatus[i+3];
        prevStatus[i+3] = 0;
        prevNode.push(new this.constructor(prevStatus, [1].concat(this.Dpath)));
    }
    // if Down is enable
    if(i > 2)
    {
        prevStatus = this.Status.concat();
        prevStatus[i] = prevStatus[i-3];
        prevStatus[i-3] = 0;
        prevNode.push(new this.constructor(prevStatus, [0].concat(this.Dpath)));
    }
    // if Left is enable
    if(i%3 < 2)
    {
        prevStatus = this.Status.concat();
        prevStatus[i] = prevStatus[i+1];
        prevStatus[i+1] = 0;
        prevNode.push(new this.constructor(prevStatus, [3].concat(this.Dpath)));
    }
    // if Right is enable
    if(i%3 > 0)
    {
        prevStatus = this.Status.concat();
        prevStatus[i] = prevStatus[i-1];
        prevStatus[i-1] = 0;
        prevNode.push(new this.constructor(prevStatus, [2].concat(this.Dpath)));
    }

    return prevNode;
};

function ENode(__status, __dpath) {
    this.newMethod = Node;
    this.newMethod(__status, __dpath);
    delete this.newMethod;

    this.Eval = this.EvalF();
}

ENode.prototype.Next = Node.prototype.Next;

ENode.prototype.EvalF = function() {
    // Use Global Variable __evalf
    var h = this.Dpath.length;
    var i, j, temp;
    for (i=0; i<9; i++) {
        if (temp = this.Status[i]) {
            j = Target.indexOf(temp);
            h += __evalf[9*i+j];
        }
    }
    return h;
};

function InQueue(__nodeset, __src) {
    for (var i in __nodeset)
    {
        if (__nodeset[i].Eval > __src.Eval)
        {
            __nodeset.splice(i, 0, __src);
            return;
        }
    }
    __nodeset.push(__src);

    return;
}


// The Dafault Codes
var algorithm1 = "// Depth First Search as Follow\n" +
"var stack = [];\n" +
"var dst, next;\n" +
"var i, flag = 0;\n" +
"var count = 0;\n" +
"var depth=5;\n" +
"\n" +
"stack.push(new Node(Status, []));\n" +
"\n" +
"while (stack!=[]) \n" +
"{\n" +
"    dst = stack.pop();\n" +
"\n" +
"    if (Equal(dst.Status, Target))\n" +
"    {\n" +
"        flag = 1;\n" +
"        break;\n" +
"    }\n" +
"\n" +
"    next = dst.Next();\n" +
"\n" +
"    for (i in next)\n" +
"    {\n" +
"        if (Include(next[i], stack)<0 && dst.Dpath.length<=depth)\n" +
"        {\n" +
"            stack.push(next[i]);\n" +
"            count++;\n" +
"        }\n" +
"    }\n" +
"}\n" +
"\n" +
"if (flag)\n" +
"    Result(dst.Dpath.length, count, dst.Dpath);\n" +
"else\n" +
"    alert('Cannot be Solve or the Result Beyond the Depth Set');\n";

var algorithm2 = "// Common Breadth Search as Follow\n" +
"var queue = [];\n" +
"var dst, next;\n" +
"var i;\n" +
"var count = 0;\n" +
"queue.push(new Node(Status, []));\n" +
"\n" +
"while (1) {\n" +
"    dst = queue.shift();\n" +
"\n" +
"    if (Equal(dst.Status, Target))\n" +
"        break;\n" +
"\n" +
"    next = dst.Next();\n" +
"    for (i in next)\n" +
"    {\n" +
"        if (Include(next[i], queue) < 0)\n" +
"        {\n" +
"            queue.push(next[i]);\n" +
"            count++;\n" +
"        }\n" +
"    }\n" +
"}\n" +
"\n" +
"Result(dst.Dpath.length, count, dst.Dpath);\n";

var algorithm3 = "// Two-Way Breadth Search as Follow\n" +
"var queue_src = [];\n" +
"var queue_dst = [];\n" +
"var next, prev;\n" +
"var head, dst_path;\n" +
"var i, k;\n" +
"var count = 0;\n" +
"\n" +
"queue_src.push(new Node(Status, []));\n" +
"queue_dst.push(new Node(Target, []));\n" +
"\n" +
"dst_path = null;\n" +
"\n" +
"while (1)\n" +
"{\n" +
"    head = queue_src.shift();\n" +
"\n" +
"    if ((k = Include(head, queue_dst)) >= 0)\n" +
"        dst_path = head.Dpath.concat(queue_dst[k].Dpath);\n" +
"\n" +
"    if (dst_path)\n" +
"        break;\n" +
"\n" +
"    next = head.Next();\n" +
"    for (i in next)\n" +
"    {\n" +
"        if (Include(next[i], queue_src) < 0)\n" +
"        {\n" +
"            queue_src.push(next[i]);\n" +
"            count++;\n" +
"        }\n" +
"    }\n" +
"\n" +
"    head = queue_dst.shift();\n" +
"\n" +
"    if ((k = Include(head, queue_src)) >= 0)\n" +
"        dst_path = queue_src[k].Dpath.concat(head.Dpath);\n" +
"\n" +
"    if (dst_path)\n" +
"        break;\n" +
"\n" +
"    prev = head.Prev();\n" +
"    for (i in prev)\n" +
"    {\n" +
"        if (Include(prev[i], queue_dst))\n" +
"        {\n" +
"            queue_dst.push(prev[i]);\n" +
"            count++;\n" +
"        }\n" +
"    }\n" +
"}\n" +
"\n" +
"Result(dst_path.length, count, dst_path);\n";

var algorithm4 = "// A* Search as Follow\n" +
"var Open = [];\n" +
"var Closed = [];\n" +
"var dst, next, tmp;\n" +
"var i, k;\n" +
"var count = 0;\n" +
"\n" +
"Open.push(new ENode(Status, []));\n" +
"\n" +
"while (Open!=[])\n" +
"{\n" +
"    dst = Open.shift();\n" +
"    if (Equal(dst.Status, Target))\n" +
"        break;\n" +
"\n" +
"    next = dst.Next();\n" +
"    for (i in next)\n" +
"    {\n" +
"        if ((k = Include(next[i], Open)) > -1)\n" +
"        {\n" +
"            if (next[i].Dpath.length < Open[k].Dpath.length)\n" +
"            {\n" +
"                Open.splice(k, 1);\n" +
"                InQueue(Open, next[i]);\n" +
"                count++;\n" +
"            }\n" +
"        }\n" +
"        else if ((k = Include(next[i], Closed)) > -1)\n" +
"        {\n" +
"            if (next[i].Dpath.length < Closed[k].Dpath.length)\n" +
"            {\n" +
"                Closed.splice(k, 1);\n" +
"                InQueue(Open, next[i]);\n" +
"                count++;\n" +
"            }\n" +
"        }\n" +
"        else\n" +
"        {\n" +
"            InQueue(Open, next[i]);\n" +
"            count++;\n" +
"        }\n" +
"    }\n" +
"\n" +
"    if ((k = Include(dst, Closed)) > -1)\n" +
"    {\n" +
"        if (dst.Dpath.length < Closed[k].Dpath.length)\n" +
"        {\n" +
"            Closed[k].Dpath = dst.Dpath;\n" +
"            Closed[k].Eval = dst.Eval;\n" +
"        }\n" +
"    }\n" +
"    else\n" +
"    {\n" +
"        Closed.push(dst);\n" +
"    }\n" +
"}\n" +
"\n" +
"Result(dst.Dpath.length, count, dst.Dpath);\n";