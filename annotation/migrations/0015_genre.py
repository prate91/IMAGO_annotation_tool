# Generated by Django 3.0.7 on 2021-04-13 10:22

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('annotation', '0014_topography'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data', django.contrib.postgres.fields.jsonb.JSONField()),
            ],
            options={
                'verbose_name_plural': 'Genres',
                'ordering': ['data__name'],
            },
        ),
    ]
