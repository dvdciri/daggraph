package iammert.com.dagger_android_injection;

import dagger.android.AndroidInjector;
import dagger.android.DaggerApplication;
import iammert.com.dagger_android_injection.di.AppComponent;
import iammert.com.dagger_android_injection.di.DaggerAppComponent;


/**
 * Created by mertsimsek on 25/05/2017.
 */

public class AndroidSampleApp extends DaggerApplication {


    protected AndroidInjector<? extends DaggerApplication> applicationInjector() {
        AppComponent appComponent = DaggerAppComponent.builder().application(this).build();
        appComponent.inject(this);
        return appComponent;
    }
}
