package iammert.com.dagger_android_injection.di;

import android.content.Context;
import android.content.res.Resources;

import javax.inject.Named;

import dagger.Module;
import dagger.Provides;

/**
 * Created by mertsimsek on 25/05/2017.
 */
@Module
public class AppModule {

    @Provides
    Resources provideResources(Context context) {
        return context.getResources();
    }

    @Provides
    @Named("String1 test")
    public String provideString() {
        return "Wooow";
    }

    @Named("String2")
    @Provides
    String provideAnotherString() {
        return "Wooow2";
    }
}
