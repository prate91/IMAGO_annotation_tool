# Generated by Django 3.0.7 on 2020-12-01 17:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('annotation', '0008_auto_20201201_1744'),
    ]

    operations = [
        migrations.AlterField(
            model_name='owner',
            name='commentary',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='owner',
            name='owner',
            field=models.IntegerField(),
        ),
    ]
