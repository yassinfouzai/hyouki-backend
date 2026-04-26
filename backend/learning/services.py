from datetime import timedelta
from django.utils import timezone
from .models import UserProgress

def level_up(progress):
    if progress.tier == "beginner":
        if progress.tier_level < 4:
            progress.tier_level += 1
        else:
            progress.tier = "intermediate"
            progress.tier_level = 1

    elif progress.tier == "intermediate":
        if progress.tier_level < 3:
            progress.tier_level += 1
        else:
            progress.tier = "advanced"
            progress.tier_level = 1

    elif progress.tier == "advanced":
        if progress.tier_level < 2:
            progress.tier_level += 1
        else:
            progress.tier = "master"
            progress.tier_level = 1

    elif progress.tier == "master":
        progress.tier = "infinite"
        progress.tier_level = 1

    progress.save()



def calculate_next_interval(progress, correct: bool):

    if not correct:
        return timedelta(minutes=5)


    ''' Real Progression
           hours = {
            "beginner": 12,
            "intermediate": 48 * 2,
            "advanced": 24 * 7,
            "master": 24 * 30,
            "infinite": 24 * 30 * 3,
            }.get(progress.tier, 10)         
            
    '''

    base = {
        "beginner": 10,
        "intermediate": 60,
        "advanced": 24 * 60,
        "master": 7 * 24 * 60,
        "infinite": 30 * 24 * 60,
    }

    minutes = base.get(progress.tier, 10)
    return timedelta(minutes=minutes)

def apply_review(progress, correct: bool):

    if correct:
        progress.correct_streak += 1

        if progress.correct_streak >= 3:
            progress.correct_streak = 0
            level_up(progress)

    else:
        progress.correct_streak = 0

    progress.next_review = timezone.now() + calculate_next_interval(progress, correct)
    progress.save()


def get_next_due(user):
    return (
        UserProgress.objects
        .filter(user=user, next_review__lte=timezone.now())
        .order_by('next_review')
        .first()
    )
