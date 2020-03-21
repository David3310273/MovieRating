from pyspark import SparkContext
import os
import redis


if __name__ == '__main__':
    os.environ["PYSPARK_PYTHON"] = "/usr/bin/python3"
    os.environ["PYSPARK_DRIVER_PYTHON"] = "/usr/bin/python3"
    conn = redis.Redis(host='127.0.0.1', port=6379, db=0);
    sc = SparkContext()

    base = sc.textFile("../logs/ratings.csv").filter(lambda line: int(line.split(',')[2]) > 5).map(lambda line: ((line.split(",")[0], line.split(",")[1]), line.split(",")[2])).reduceByKey(lambda a,b: int(a)+int(b))

    userlist = base.map(lambda line: (line[0][0], line[0][1]))
    movielist = base.map(lambda line: (line[0][1], line[0][0]))
    movie_common = movielist.join(movielist).map(lambda line: ((line[1][0], line[1][1]), 1)).reduceByKey(lambda a, b: a+b).map(lambda line: (line[0][0], line[0][1]))

    recommend_list = movie_common.join(userlist).map(lambda line: (line[1][0], line[1][1])).reduceByKey(lambda a, b: [a]+[b] if type(a) != list and type(b) != list else (a+b if type(a) == list and type(b) == list else (a+[b] if type(a) == list else [a]+b))).map(lambda line: (line[0], line[1]))
    # result stores in redis
    for item in recommend_list.toLocalIterator():
        conn.hset("recommends", item[0], ",".join(item[1]))

