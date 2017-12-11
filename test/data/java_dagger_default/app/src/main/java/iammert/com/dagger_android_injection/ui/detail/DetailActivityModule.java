package iammert.com.dagger_android_injection.ui.detail;

import dagger.Binds;
import dagger.Module;
import dagger.Provides;
import iammert.com.dagger_android_injection.data.ApiService;

/**
 * Created by mertsimsek on 30/05/2017.
 */
@Module
public abstract class DetailActivityModule {

    @Provides
    static DetailPresenter provideDetailPresenter(DetailView detailView, ApiService apiService) {
        return new DetailPresenterImpl(detailView, apiService);
    }

    @Binds
    abstract DetailView provideDetailView(DetailActivity detailActivity);
}
