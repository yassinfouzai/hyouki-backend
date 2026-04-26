from django.contrib.auth.models import User
from django.db import models

class LearningItem(models.Model):

    ITEM_TYPE_CHOICES = [
        ('radical', 'Radical'),
        ('kanji', 'Kanji'),
        ('hiragana', 'Hiragana'),
        ('katakana', 'Katakana'),
        ('vocabulary', 'Vocabulary'),
    ]

    item_type = models.CharField(
        max_length=20,
        choices=ITEM_TYPE_CHOICES
    )

    character = models.CharField(max_length=20)

    meaning = models.CharField(max_length=200, blank=True)
    reading = models.CharField(max_length=200, blank=True)

    description = models.TextField(blank=True)

    level = models.IntegerField(default=1)

    def save(self, *args, **kwargs):
        if self.level > 60:
            self.level = 60
        if self.level < 1:
            self.level = 1

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.character} ({self.item_type})"


class UserProgress(models.Model):
    '''
    TIER_CHOICES = [
        ('beginner1', 'Beginner 1'),
        ('beginner2', 'Beginner 2'),
        ('beginner3', 'Beginner 3'),
        ('beginner4', 'Beginner 4'),
        ('intermediate1', 'Intermediate 1'),
        ('intermediate2', 'Intermediate 2'),
        ('intermediate3', 'Intermediate 3'),
        ('advanced1', 'Advanced 1'),
        ('advanced2', 'Advanced 2'),
        ('master', 'Master'),
        ('infinite', 'Infinite'),
    ]'''

    TIER_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('master', 'Master'),
        ('infinite', 'Infinite'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    item = models.ForeignKey(LearningItem, on_delete=models.CASCADE)

    tier = models.CharField(max_length=20, choices=TIER_CHOICES, default='beginner')
    tier_level = models.IntegerField(default=1)

    correct_streak = models.IntegerField(default=0)
    next_review = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        limits = {
            "beginner": 4,
            "intermediate": 3,
            "advanced": 2,
            "master": 1,
            "infinite": 1,
        }

        max_level = limits.get(self.tier, 1)

        if self.tier_level > max_level:
            self.tier_level = max_level

        super().save(*args, **kwargs)

    class Meta:
        unique_together = ('user', 'item')
