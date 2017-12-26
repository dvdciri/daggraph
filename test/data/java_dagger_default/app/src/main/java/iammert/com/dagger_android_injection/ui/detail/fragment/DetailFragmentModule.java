package iammert.com.dagger_android_injection.ui.detail.fragment;

import dagger.Module;
import dagger.Provides;

/**
 * Created by mertsimsek on 02/06/2017.
 */
@Module
public class DetailFragmentModule {

    @Provides
    DetailFragmentView provideDetailFragmentView(DetailFragment detailFragment){
        return detailFragment;
    }

}
