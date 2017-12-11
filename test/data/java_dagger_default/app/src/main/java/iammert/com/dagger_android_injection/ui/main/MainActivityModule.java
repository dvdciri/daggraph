package iammert.com.dagger_android_injection.ui.main;

import dagger.Binds;
import dagger.Module;
import dagger.Provides;
import iammert.com.dagger_android_injection.data.ApiService;

/**
 * Created by mertsimsek on 25/05/2017.
 */
@Module
public abstract class MainActivityModule {

    @Provides
    static MainPresenter provideMainPresenter(MainView mainView, ApiService apiService) {
        return new MainPresenterImpl(mainView, apiService);
    }

    @Binds
    abstract MainView provideMainView(MainActivity mainActivity);
}
