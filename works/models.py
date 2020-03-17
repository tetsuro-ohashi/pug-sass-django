import datetime

from django.db import models
from django.utils import timezone

# Create your models here.


class Work(models.Model):
    # category = models.ForeignKey(Category, on_delete=models.PROTECT)
    # tags = models.ManyToManyField(Tag, blank=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    # description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(blank=True, null=True)
    is_public = models.BooleanField(default=False)
    # pub_date = models.DateTimeField('date published')
    photo = models.ImageField(upload_to='images/', default=False)

    class Meta:
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if self.is_public and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.published_at <= now

    def __str__(self):
        return self.title
