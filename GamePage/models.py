from django.db import models

# Create your models here.

class Card(models.Model):
    title = models.CharField(max_length=36)
    date = models.IntegerField()
    pic = models.CharField(max_length=300, default='Text')
    link = models.CharField(max_length=300, default='Text')
    text = models.CharField(max_length=500, default='Text')

    def toObj(self):
        return {'title': self.title,
                'date': self.date,
                'pic': self.pic,
                'link': self.link,
                'text': self.text
                }

    