import sys, json
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.neighbors import NearestNeighbors

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    # Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():
    # get our data as an array from read_in()
    data_array = read_in()
    user_id = data_array.pop(); # dict of the current user id 

    # convert list of Dictionaries to Pandas Dataframe
    df = pd.DataFrame.from_records(data_array)
    # get df of user
    user_df = df[df.user == user_id["_id"]]
    df_without_user = df[df.user != user_id["_id"]]

    # removing irelevant columns
    ids = df_without_user['user'].values.tolist()
    x = df_without_user.drop(columns=['_id', 'user', '__v'])
    user_df_dropped = user_df.drop(columns=['_id', 'user', '__v'])
    t = user_df_dropped.values.tolist()[0]

    nbrs = NearestNeighbors().fit(x)

    distances, indexes = nbrs.kneighbors([t])
    list_of_results = []
    for indx in indexes[0]:
        uuid = ids[indx]
        res = df[df.user == uuid]
        user_result_data = res.T.to_dict()
        data = user_result_data[list(user_result_data.keys())[0]]
        list_of_results.append(data['user'])
    json_result = json.dumps(list_of_results)
    print(json_result)
    
# Start process
if __name__ == '__main__':
    main()