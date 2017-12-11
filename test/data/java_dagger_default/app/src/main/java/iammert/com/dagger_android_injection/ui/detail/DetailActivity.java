package iammert.com.dagger_android_injection.ui.detail;

import android.os.Bundle;
import android.util.Log;

import javax.inject.Inject;

import dagger.android.support.DaggerAppCompatActivity;
import iammert.com.dagger_android_injection.R;
import iammert.com.dagger_android_injection.ui.detail.fragment.DetailFragment;

/**
 * Created by mertsimsek on 25/05/2017.
 */

public class DetailActivity extends DaggerAppCompatActivity implements DetailView {

    @Inject
    DetailPresenter detailPresenter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detail);
        detailPresenter.loadDetail();

        if (savedInstanceState == null)
            getSupportFragmentManager()
                    .beginTransaction()
                    .add(R.id.container, DetailFragment.newInstance())
                    .commitAllowingStateLoss();
    }

    @Override
    public void onDetailLoaded() {
        Log.v("TEST", "Detail is loaded");
    }

}
