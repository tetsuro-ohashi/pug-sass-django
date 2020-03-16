from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

from .models import Work
from posts.models import Post

def index(request):
    latest_work_list = Work.objects.order_by('-published_at')[:5]
    latest_post_list = Post.objects.order_by('-published_at')[:5]
    context = {'latest_post_list': latest_post_list,'latest_work_list': latest_work_list,}
    return render(request, 'works/index.html', context)

def detail(request, work_id):
    work = get_object_or_404(Work, pk=work_id)
    return render(request, 'works/detail.html', {'work': work})
