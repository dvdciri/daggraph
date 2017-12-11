package iammert.com.dagger_android_injection.ui.detail.fragment;

import android.content.Context;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import javax.inject.Inject;

import dagger.android.support.DaggerFragment;

/**
 * Created by mertsimsek on 02/06/2017.
 */

public class DetailFragment extends DaggerFragment implements DetailFragmentView {

    @Inject
    DetailFragmentPresenter detailFragmentPresenter;

    public static DetailFragment newInstance() {
        Bundle args = new Bundle();
        DetailFragment fragment = new DetailFragment();
        fragment.setArguments(args);
        return fragment;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return super.onCreateView(inflater, container, savedInstanceState);
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
    }

    @Override
    public void onDetailFragmentLoaded() {
        Log.v("TEST", "OnDetailFragmentLoaded.");
    }
}
