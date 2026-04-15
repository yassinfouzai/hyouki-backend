from django.contrib import admin
from .models import LearningItem, UserProgress

admin.site.register(LearningItem)
admin.site.register(UserProgress)
