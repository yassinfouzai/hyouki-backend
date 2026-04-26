from django.contrib.auth.models import User
from django.db import models

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    level = models.IntegerField(default=1)

    total_radicals_learned = models.IntegerField(default=0)
    total_kanji_learned = models.IntegerField(default=0)
    total_vocab_learned = models.IntegerField(default=0)
    streak = models.IntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username
