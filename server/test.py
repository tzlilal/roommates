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

    # convert list of Dictionaries to Pandas Dataframe
    df = pd.DataFrame.from_records(data_array)

    # removing irelevant columns
    x = df.drop(columns=['_id', 'user', '__v'])

    nbrs = NearestNeighbors().fit(x)
    t = [1, 64, 1, 1, 128, 1, 128, 256]
    print(nbrs.kneighbors([t]))

# Start process
if __name__ == '__main__':
    main()