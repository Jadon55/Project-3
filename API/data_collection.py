import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, text, inspect, func, MetaData, select

# function to get all data from the "crashes" table
def getAll():
    # connect to the database
    engine = create_engine("postgresql://postgres:project3@107.172.217.213:5432/project3")
    connection = engine.connect()
    # make request to database
    result = connection.execute(text('SELECT * FROM "Crashes"'))
    
    # get column names from the crashes table
    metadata = MetaData()
    metadata.reflect(bind=engine, only=['Crashes'])
    column_names = metadata.tables['Crashes'].columns.keys()

    # convert the data from the database into a dict
    result_dicts = [dict(zip(column_names, row)) for row in result]

    #pull from public transport table
    pt = connection.execute(text('SELECT * FROM "public_transport"'))

    # get column names from the public_transport table
    metadata.reflect(bind=engine, only=['public_transport'])
    column_names = metadata.tables['public_transport'].columns.keys()

    # convert the public transport data from the database into a dict
    pt_dict = [dict(zip(column_names, row)) for row in pt]
    
    
    # close the connection to the databse
    connection.close()
    # return the data dict
    return result_dicts + pt_dict

# function to get all data from the "crashes" table
def getYear(year):
    # connect to the database
    engine = create_engine("postgresql://postgres:project3@107.172.217.213:5432/project3")
    connection = engine.connect()
    # make request to database
    result = connection.execute(text(f'SELECT * FROM "Crashes" WHERE "crashYear" = {year}'))
    
    # get column names from the crashes table
    metadata = MetaData()
    metadata.reflect(bind=engine, only=['Crashes'])
    column_names = metadata.tables['Crashes'].columns.keys()

    # convert the data from the database into a dict
    result_dicts = [dict(zip(column_names, row)) for row in result]
    # close the connection to the databse
    connection.close()
    # return the data dict
    return result_dicts
