package iammert.com.dagger_android_injection.ui.detail.fragment;

import javax.inject.Inject;

/**
 * Created by mertsimsek on 02/06/2017.
 */

public class DetailFragmentPresenter {

    DetailFragmentView detailFragmentView;

    @Inject
    public DetailFragmentPresenter(DetailFragmentView detailFragmentView) {
        this.detailFragmentView = detailFragmentView;
        detailFragmentView.onDetailFragmentLoaded();
    }
}
