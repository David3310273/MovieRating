from pyspark import SparkContext;
import redis;

conn = redis.Redis(host='127.0.0.1', port=6379, db=0);
sc = SparkContext();

rdd = sc.textFile("../logs/movies.csv").filter(lambda line: line.split(',')[1] != "-1").map(lambda line: (line.split(",")[1], 1)).reduceByKey(lambda x, y: x+y).map(lambda x: (x, x[1])).sortBy(lambda x: x[1], ascending=False)

result = rdd.take(50);

# result stores in redis

# clear all data in movies
conn.delete("movies", 0, -1)

for item in result:
    conn.sadd("movies", item[0][0])