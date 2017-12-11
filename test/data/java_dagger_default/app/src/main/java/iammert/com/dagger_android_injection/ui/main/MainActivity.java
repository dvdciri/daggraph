package iammert.com.dagger_android_injection.ui.main;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import javax.inject.Inject;
import javax.inject.Named;

import dagger.android.support.DaggerAppCompatActivity;
import iammert.com.dagger_android_injection.R;
import iammert.com.dagger_android_injection.ui.detail.DetailActivity;

public class MainActivity extends DaggerAppCompatActivity implements MainView {

    @Inject
    MainPresenter mainPresenter;

    @Named("String1 test")
    @Inject
    String mString;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mainPresenter.loadMain();

        findViewById(R.id.button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(MainActivity.this, DetailActivity.class));
            }
        });
    }

    @Override
    public void onMainLoaded() {
        Log.v("TEST", "Main page is loaded.");
    }
}
