package iammert.com.dagger_android_injection.di;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;
import iammert.com.dagger_android_injection.ui.detail.DetailActivity;
import iammert.com.dagger_android_injection.ui.detail.DetailActivityModule;
import iammert.com.dagger_android_injection.ui.detail.DetailFragmentProvider;
import iammert.com.dagger_android_injection.ui.main.MainActivity;
import iammert.com.dagger_android_injection.ui.main.MainActivityModule;

/**
 * Created by mertsimsek on 25/05/2017.
 */
@Module
public abstract class ActivityBuilder {

    @ContributesAndroidInjector(modules = MainActivityModule.class)
    abstract MainActivity bindMainActivity();

    @ContributesAndroidInjector(modules = {DetailActivityModule.class, DetailFragmentProvider.class})
    abstract DetailActivity bindDetailActivity();

}
