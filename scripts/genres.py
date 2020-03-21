from pyspark import SparkContext
import redis

conn = redis.Redis(host='127.0.0.1', port=6379, db=0)
sc = SparkContext()

rdd = sc.textFile("../logs/genres.csv").map(lambda line: (line.split(",")[1], 1)).reduceByKey(lambda x, y: x+y).map(lambda x: (x, x[1])).sortBy(lambda x: x[1], ascending=False)

result = rdd.collect()

# result stores in redis

for item in result:
    conn.zadd("genres", {item[0][0]: item[1]})