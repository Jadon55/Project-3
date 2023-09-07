import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, inspect, func, MetaData, select

def getAll():
    engine = create_engine("postgresql://postgres:project3@107.172.217.213:5432/project3")
    connection = engine.connect()
    result = connection.execute(text('SELECT * FROM "Crashes"'))
    
    metadata = MetaData()
    metadata.reflect(bind=engine, only=['Crashes'])
    column_names = metadata.tables['Crashes'].columns.keys()

    result_dicts = [dict(zip(column_names, row)) for row in result]
    return result_dicts

def getYear(year):
    engine = create_engine("postgresql://postgres:project3@107.172.217.213:5432/project3")
    connection = engine.connect()
    result = connection.execute(text(f'SELECT * FROM "Crashes" WHERE "crashYear" = {year}'))
    
    metadata = MetaData()
    metadata.reflect(bind=engine, only=['Crashes'])
    column_names = metadata.tables['Crashes'].columns.keys()

    result_dicts = [dict(zip(column_names, row)) for row in result]
    return result_dicts
