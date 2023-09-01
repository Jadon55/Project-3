import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, inspect, func, MetaData, select

def test():
    engine = create_engine("postgresql://postgres:project3@107.172.217.213:5432/project3")
    print("start")
    result = engine.execute(text('SELECT * FROM "Crashes"'))
    result_dicts = [dict(row) for row in result]
    print(result_dicts)
    print("end")