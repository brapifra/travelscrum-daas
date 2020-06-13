from sklearn import datasets
from sklearn.ensemble import GradientBoostingClassifier
import pickle

# import data
#TODO update the input model
iris = datasets.load_iris()

# take the first two features.
X = iris.data[:, :2] 
Y = iris.target

# init the ML model
clf = GradientBoostingClassifier(n_estimators=100, learning_rate=1.0,
                                 max_depth=2, random_state=0)
# fit model
clf.fit(X, Y)

# save model
pickle.dump(clf, open("model_v2_moi.pkl", "wb",protocol=2))