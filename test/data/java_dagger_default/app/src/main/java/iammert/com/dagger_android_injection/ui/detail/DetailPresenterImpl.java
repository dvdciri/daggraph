package iammert.com.dagger_android_injection.ui.detail;

import javax.inject.Inject;

import iammert.com.dagger_android_injection.data.ApiService;

/**
 * Created by mertsimsek on 30/05/2017.
 */

public class DetailPresenterImpl implements DetailPresenter{

    DetailView detailView;
    ApiService apiService;

    @Inject
    public DetailPresenterImpl(DetailView detailView, ApiService apiService) {
        this.detailView = detailView;
        this.apiService = apiService;
    }

    public void loadDetail(){
        apiService.loadData();
        detailView.onDetailLoaded();
    }
}
