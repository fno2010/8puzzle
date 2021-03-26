// Algorithm 1
var queue = [];
var dst, next;
var i, j;
var count = 0;
queue.push(new Node(Status, []));

while (1) {
    dst = queue.shift();

    if (Equal(dst.Status, Target)) break;

    next = dst.Next();
    for (i in next)
    {
        flag = 1;
        for (j in queue)
        {
            if (Equal(queue[j].Status, next[i].Status))
            {
                flag = 0;
                break;
            }
        }

        if (flag == 1)
        {
            queue.push(next[i]);
            count++;
        }
    }
}

Move(dst.Dpath);
alert(count);




// Algorithm 2
var queue_src = [];
var queue_dst = [];
var next, prev;
var tail, dst_path;
var i, j;
var count = 0;

queue_src.push(new Node(Status, []));
queue_dst.push(new Node(Target, []));

dst_path = null;

while (1)
{
    tail = queue_src.shift();

    for (i in queue_dst)
        if (Equal(tail.Status, queue_dst[i].Status))
        {
            dst_path = tail.Dpath.concat(queue_dst[i].Dpath);
            break;
        }

    if (dst_path)
        break;

    next = tail.Next();
    for (i in next)
    {
        flag = 1;
        for (j in queue_src)
        {
            if (Equal(queue_src[j].Status, next[i].Status))
            {
                flag = 0;
                break;
            }
        }

        if (flag == 1)
        {
            queue_src.push(next[i]);
            count++;
        }
    }

    tail = queue_dst.shift();

    for (i in queue_src)
        if (Equal(tail.Status, queue_src[i].Status))
        {
            dst_path = queue_src[i].Dpath.concat(tail.Dpath);
            break;
        }

    if (dst_path)
        break;

    prev = tail.Prev();
    for (i in prev)
    {
        flag = 1;
        for (j in queue_dst)
        {
            if (Equal(queue_dst[j].Status, prev[i].Status))
            {
                flag = 0;
                break;
            }
        }

        if (flag == 1)
        {
            queue_dst.push(prev[i]);
            count++;
        }
    }
}

Move(dst_path);
alert(count);



// A* Search as Follow
if (Judge(Status))
{
var Open = [];
var Closed = [];
var dst, next, tmp;
var i, k;
var count = 0;

Open.push(new ENode(Status, []));

while (Open!=[])
{
    dst = Open.shift();
    if (Equal(dst.Status, Target))
        break;

    next = dst.Next();
    for (i in next)
    {
        if ((k = Include(next[i], Open)) > -1)
        {
            if (next[i].Dpath.length < Open[k].Dpath.length)
            {
                Open.splice(k, 1);
                InQueue(Open, next[i]);
                count++;
            }
        }
        else if ((k = Include(next[i], Closed)) > -1)
        {
            if (next[i].Dpath.length < Closed[k].Dpath.length)
            {
                Closed.splice(k, 1);
                InQueue(Open, next[i]);
                count++;
            }
        }
        else
        {
            InQueue(Open, next[i]);
            count++;
        }
    }

    if ((k = Include(dst, Closed)) > -1)
    {
        if (dst.Dpath.length < Closed[k].Dpath.length)
        {
            Closed[k].Dpath = dst.Dpath;
            Closed[k].Eval = dst.Eval;
        }
    }
    else
    {
        Closed.push(dst);
    }
}

Move(dst.Dpath);
alert(count + 'Nodes have been searched');
}
else
{
alert('Cannot Solve');
}
