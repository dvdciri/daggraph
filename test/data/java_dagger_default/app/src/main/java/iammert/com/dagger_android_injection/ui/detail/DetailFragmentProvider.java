package iammert.com.dagger_android_injection.ui.detail;

import dagger.Module;
import dagger.android.ContributesAndroidInjector;
import iammert.com.dagger_android_injection.ui.detail.fragment.DetailFragment;
import iammert.com.dagger_android_injection.ui.detail.fragment.DetailFragmentModule;

/**
 * Created by mertsimsek on 02/06/2017.
 */
@Module
public abstract class DetailFragmentProvider {

    @ContributesAndroidInjector(modules = DetailFragmentModule.class)
    abstract DetailFragment provideDetailFragmentFactory();
}
