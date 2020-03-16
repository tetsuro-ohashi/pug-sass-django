# Generated by Django 3.0.4 on 2020-03-15 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Blog',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('published_at', models.DateTimeField(blank=True, null=True)),
                ('is_public', models.BooleanField(default=False)),
                ('photo', models.ImageField(default=False, upload_to='images/')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
