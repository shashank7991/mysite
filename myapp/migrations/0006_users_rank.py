# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2016-12-14 09:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_auto_20161214_0750'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='rank',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
