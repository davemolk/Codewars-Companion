'''
https://www.codewars.com/kata/582746fa14b3892727000c4f/train/python

You will be given an array of objects (hashes in ruby) representing data about developers who have signed up to attend the coding meetup that you are organising for the first time.

Your task is to return the number of JavaScript developers coming from Europe.

'''

def count_developers(lst):
    count = 0
    for dev in lst:
        if dev['language'] == 'JavaScript' and dev['continent'] == 'Europe':
            count +=1
            
    return count  
  

  '''
  def count_developers(lst):
    return sum(dev["language"] == "JavaScript" and dev["continent"] == "Europe" for dev in lst)
