from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from .services import get_next_due, apply_review


@login_required
def review(request):
    progress = get_next_due(request.user)

    if not progress:
        return render(request, "learning/review.html", {
            "message": "No items due"
        })

    if request.method == "POST":
        user_answer = request.POST.get("answer")

        correct = user_answer.strip().lower() == progress.item.meaning.lower()

        apply_review(progress, correct)

        return redirect("review")

    return render(request, "learning/review.html", {
        "progress": progress
    })
