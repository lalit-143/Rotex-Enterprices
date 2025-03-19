# Generated by Django 5.1.7 on 2025-03-19 09:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0009_certificate'),
    ]

    operations = [
        migrations.DeleteModel(
            name='GSTUdyamCertificate',
        ),
        migrations.DeleteModel(
            name='ISOCertificate',
        ),
        migrations.RenameField(
            model_name='certificate',
            old_name='gst',
            new_name='iso1_image',
        ),
        migrations.RenameField(
            model_name='certificate',
            old_name='name',
            new_name='iso1_name',
        ),
        migrations.RenameField(
            model_name='certificate',
            old_name='iso1',
            new_name='iso2_image',
        ),
        migrations.RenameField(
            model_name='certificate',
            old_name='iso2',
            new_name='iso3_image',
        ),
        migrations.RemoveField(
            model_name='certificate',
            name='iso3',
        ),
        migrations.RemoveField(
            model_name='certificate',
            name='udyam',
        ),
        migrations.AddField(
            model_name='certificate',
            name='gst_pdf',
            field=models.FileField(blank=True, upload_to='certificates'),
        ),
        migrations.AddField(
            model_name='certificate',
            name='iso2_name',
            field=models.CharField(default='lk', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='certificate',
            name='iso3_name',
            field=models.CharField(default='lk', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='certificate',
            name='show_gst',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='certificate',
            name='show_udyam',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='certificate',
            name='udyam_pdf',
            field=models.FileField(blank=True, upload_to='certificates'),
        ),
    ]
